import { render,screen} from '@testing-library/react'
import Location from '../Location'
import userEvent from '@testing-library/user-event'

describe( 'Location' , ()=> {

    it('should change city paragraph to input after click' , async ()=>{
        // Arrange
        render(<Location/>)
        // Act
        const clickableElement = screen.getByTestId('clickable')
        await userEvent.click(clickableElement)
        const input = await screen.findByTestId('cityInput')

        // Assert
        expect(input).toBeInTheDocument()
    })
})