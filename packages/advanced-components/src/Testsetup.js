import jsdom from 'jsdom';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
configure({ adapter: new Adapter() });
