import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg)
  }
`;

export const Loader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
  svg {
    animation: ${rotate} 1s cubic-bezier(0.27, 0.67, 0.83, 0.67) infinite;
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
    svg {
      margin-right: 10px;
    }
    strong {
      font-weight: 600;
    }
  }
`;

export const Info = styled.div`
  flex: 1;
  margin: 50px 0 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  h1 {
    font-size: 24px;
    margin-top: 20px;
  }
  span {
    font-size: 18px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    text-align: center;
    max-width: 400px;
  }
`;

export const PullRequestList = styled.div`
  padding-top: 25px;
  margin-top: 25px;
  border-top: 1px solid #eee;
  .title {
    h1 {
      width: 100%;
      font-size: 24px;
      margin-top: 20px;
    }
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      margin-top: 5px;
      color: #353b48;
      font-size: 14px;
      transition: all 0.25s ease-in-out;

      &:hover {
        color: #27ae60;
      }
      svg {
        margin-right: 5px;
      }
    }
  }
  ul {
    list-style: none;
    margin-top: 25px;
    li {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      padding: 15px 10px;
      border: 1px solid #eee;
      border-radius: 4px;
      & + li {
        margin-top: 10px;
      }
      .infoRow {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
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
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            .title {
              flex: 1;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              a {
                display: flex;
                align-items: center;
                text-decoration: none;
                margin-top: 5px;
                color: #353b48;
                font-size: 14px;
                transition: all 0.25s ease-in-out;

                svg {
                  margin-right: 5px;
                }
                strong {
                  font-size: 16px;
                  /* color: #333; */
                }
                &:hover {
                  color: #27ae60;
                }
              }
            }

            p {
              margin-top: 5px;
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
      .body {
        width: 100%;
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #eee;
        white-space: pre-wrap;
        font-size: 14px;
        overflow-y: auto;
        max-height: 400px;
        text-overflow: clip;
        transition: 0.25s ease-in-out;
      }
      &.closed {
        .body {
          max-height: 0;
          overflow-y: hidden;
          padding: 0;
          margin: 0;
          border-color: transparent;
        }
      }
    }
  }
`;

export const InfoRow = styled.div`
  display: flex;
`;

export const Label = styled.span`
  background-color: ${props => `#${props.color}` || '#ccc'};
  color: #fff;
  border-radius: 4px;
  padding: 5px;
  font-size: 10px;
  margin-left: 10px;
`;

export const OpenButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 13px;
  border: 0;
  background: none;
  color: #27ae60;
  margin: 1px 0 1px 15px;
  transition: all 0.25s ease-in-out;

  svg {
    transition: all 0.25s ease-in-out;
  }
  &.closed {
    svg {
      color: #ccc;
      transform: rotate(180deg);
    }
  }

  &:hover {
    svg {
      color: #27ae60;
    }
  }
`;

export const Empty = styled.div`
  margin: 50px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #aaa;
  p {
    padding: 25px 0;
  }
  img {
    max-height: 250px;
  }
`;

export const Error = styled.div`
  margin: 50px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #ff4757;
  p {
    padding: 25px 0;
  }
  img {
    max-height: 250px;
  }
`;
