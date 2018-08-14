import styled from 'styled-components';

const DocumentationLink = styled.a`
  font-size: ${props => (props.startPane ? '18px' : '16px')};
  line-height: 1;

  display: inline-flex;
  align-self: ${props => (props.startPane ? 'flex-end' : 'center')};
  margin-right: 10px;

  margin-top: ${props => (props.startPane ? '0px' : '20px')};

  text-decoration: none;

  color: #000;
  border-bottom-width: 1px;
  border-bottom-style: dashed;

  &:hover {
    border-bottom-style: solid;
  }
`;

export default DocumentationLink;
