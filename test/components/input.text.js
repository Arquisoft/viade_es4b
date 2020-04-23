import { render, cleanup } from 'react-testing-library';
import Input from '../../src/components/Utils/Input/input.component';

afterAll(cleanup);

describe('Input', () => {
    it('renders without crashing', () => {
        expect(render(Input)).toBeTruthy();
    });
});