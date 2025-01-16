import styled from 'styled-components';

const StyledCard = styled.div`
    padding: 16px;
    border-radius: 8px;
    margin: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => (props.theme === true? '#333' : '#fff')};
    color: ${(props) => (props.theme === true ? '#fff' : '#000')};
`;

function ThemedCard({ theme, children }) {
    console.log('Theme prop in ThemedCard:', theme); // Log to check theme value

    return <StyledCard theme={theme}>{children}</StyledCard>;
}

export default ThemedCard;
