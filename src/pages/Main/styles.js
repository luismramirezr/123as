import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

export const Container = styled.div`
  max-width: 1024px;
  margin: 100px auto;
  border-radius: 4px;
  background-color: #fff;
  padding: 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  h1 {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin-bottom: 25px;
    svg {
      margin-right: 10px;
    }
    strong {
      font-weight: 600;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  height: 41px;
  border-radius: 4px;
  border: 0;
  background: #2f3640;
  color: #fff;
  margin: 1px 0 1px 15px;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: #27ae60;
  }

  &[disabled] {
    cursor: not-allowed;
    background-color: #485460;

    svg {
      animation: ${rotate} 1s cubic-bezier(0.27, 0.67, 0.83, 0.67) infinite;
    }
  }
`;

export const Input = styled.div`
  flex: 1;
  .react-autosuggest__container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;

    .react-autosuggest__input {
      width: 100%;
      padding: 10px 15px;
      border-radius: 5px;
      border: 1px solid #ddd;
      transition: all 0.25s ease-in-out;

      &.error {
        & > div {
          border-color: #ff4757;
          box-shadow: 0 0 1px #ff4757;
          & > div {
            border-color: #ff4757;
          }
        }
      }
    }

    .react-autosuggest__suggestions-container {
      position: absolute;
      top: 40.5px;
      left: 0;
      right: 0;
      max-height: 400px;
      .react-autosuggest__suggestions-list {
        max-height: 400px;
        margin: 0 5px;
        padding: 10px 0;
        background: #fff;
        border-radius: 0 0 5px 5px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        list-style: none;
        overflow: auto;
        .react-autosuggest__suggestion {
          width: 100%;
          padding: 10px 25px;
          cursor: pointer;
        }
        .react-autosuggest__suggestion--highlighted {
          background-color: #2f3640;
          color: #fff;
        }
      }
    }
  }
`;

export const RepoList = styled.div`
  padding-top: 25px;
  margin-top: 25px;
  border-top: 1px solid #eee;
  ul {
    list-style: none;
    margin-top: 25px;
    li {
      display: flex;
      padding: 15px 10px;
      border: 1px solid #eee;
      border-radius: 4px;
      & + li {
        margin-top: 10px;
      }

      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: 2px solid #eee;
      }

      div.container {
        flex: 1;
        margin-left: 15px;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        div.info {
          flex: 1;
          strong {
            font-size: 16px;
            color: #333;
          }

          p {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
`;

export const RemoveButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 13px;
  border-radius: 4px;
  border: 1px solid transparent;
  color: #2f3640;
  margin: 1px 0 1px 15px;
  transition: all 0.25s ease-in-out;
  opacity: 0.75;

  &:hover {
    color: #ff4757;
    opacity: 1;
  }
`;

export const GoButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 13px;
  border-radius: 4px;
  border: 0;
  background: #2f3640;
  color: #fff;
  margin: 1px 0 1px 15px;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: #27ae60;
  }
`;

export const Error = styled.div`
  font-size: 12px;
  color: #ff4757;
  margin: 50px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* font-size: 18px; */
  /* color: #aaa; */
  p {
    padding: 25px 0;
  }
  img {
    max-height: 250px;
  }
`;
