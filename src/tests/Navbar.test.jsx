import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/navbar/Navbar';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useDispatch: () => mockDispatch,
}));
describe('Navbar Component', () => {
    beforeEach(() => {
        render(<Navbar />);
    });

    // Test rendering and display
    it('renders without crashing', () => {
        // Assert that the component renders
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
});