Testing Approach

In first testing my components I chose to test ErrorPopUp, InputField and GameCard.
Using Enzyme I followed this main approach:
1. Ensure that the correct elements are being rendered, ie. h1, h2 etc
2. Then make sure passing certain props will render custom titles, or other components via testing with enzyme.
3. Test if passed in functions through props are called or any other resultant behaviour from dynamic events (eg. onclick)
4. Run snapshot tests to ensure components aren't randomly changing

However, there was a slight issue with my testing. This was due to the fact that all my components listed above used Material UI components which wrap standard html elements like inputs in a Material UI component. This combined with being prescribed by Hayden to use shallow rendering made it difficult to test some additional props which would be passed to child components (because shallow rendering doesn't render children). That being said I tried to cover as many cases as possible.

With completing UI testing I still had to make some adjustments since my Material UI components were at times inconvenient. That being said I was able to succesfully test for the happy path of the program. I extended the response time as I assume due to cse server load responses were quite slow. My test in the frontend folder in the folder "cypress"