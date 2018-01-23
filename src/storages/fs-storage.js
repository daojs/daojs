const Promise = require('bluebird');
const path = require('path');
const fs = require('fs-extra');

class FSStorage {
  constructor({ root }) {
    this.root = root;
    this.locks = {};
  }

  loadFile({ component, version, file }) {
    const pathV = path.join(this.root, component, '.v');
    return Promise
      .resolve(version === 'latest' ? fs.readFile(path.join(pathV, 'latest'), 'utf8') : version)
      .then(v => parseInt(v, 10).toString())
      .then(v => fs.readFile(path.join(pathV, v, file), 'utf8'));
  }

  getMetadata({ component, version }) {
    return this
      .loadFile({ component, version, file: 'metadata.json' })
      .then(JSON.parse);
  }

  getSource({ component, version }) {
    return this
      .loadFile({ component, version, file: 'source' });
  }

  set({ component, metadata, source }) {
    const pathV = path.join(this.root, component, '.v');
    const pathLatest = path.join(pathV, 'latest');

    const lock = Promise
      .resolve(this.locks[component])
      .finally(() => {
        this.locks[component] = lock;
      })
      .then(() => fs.mkdirp(pathV))
      .then(() => fs.readFile(pathLatest, 'utf8'))
      .catch(() => 0)
      .then(version => (parseInt(version, 10) + 1).toString())
      .then(version => [
        version,
        fs.writeFile(pathLatest, version, 'utf8'),
        fs.mkdirp(path.join(pathV, version)),
      ])
      .spread(version => [
        version,
        fs.writeJson(path.join(pathV, version, 'metadata.json'), metadata),
        fs.writeFile(path.join(pathV, version, 'source'), source, 'utf8'),
      ])
      .spread(version => version)
      .finally(() => {
        if (this.locks[component] === lock) {
          delete this.locks[component];
        }
      });

    return lock;
  }

  getInfo({ component }) {
    const pathComponent = path.join(this.root, component);

    return Promise.props({
      version: fs.readFile(path.join(pathComponent, '.v', 'latest'), 'utf8'),
      children: fs
        .readdir(pathComponent)
        .then(names => names.filter(name => name[0] !== '.')),
    });
  }
}

module.exports = FSStorage;
