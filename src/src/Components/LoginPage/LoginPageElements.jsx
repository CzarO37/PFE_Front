import React from 'react'
import styled from "styled-components";

const LoginContainer = styled.div`
    min-height: 692px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    background: linear-gradient(
        108deg,
        rgba(5,138,174,1) 0%,
        rgba(152,200,135,1) 100%
    );
`

const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 400px) {
        height: 80%;
    }
`

const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`

const FormContainer = styled.div`
    display: flex;
    background: rgba(5,138,174,1);
    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    column-count: 2;
`

const Form = styled.form`
    background: rgba(255,255,255,0.7);
    max-width: 400px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 80px 20px;

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
    }
`

const FormLogo = styled.img`
    width: 230px;
    height: 120px;
    margin-top: 80px;
    margin-right: 100px;
    margin-left: 10px;
`

export {
    LoginContainer,
    FormWrap,
    FormContent,
    Form,
    FormLogo,
    FormContainer
}