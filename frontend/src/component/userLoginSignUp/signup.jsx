import { use, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import backendUrl from "../../applicationProperties/database.json";
import { data, useNavigate } from "react-router";

export const SingUpParentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(120deg, #84fab0, #8fd3f4);
  padding: 20px;
`;

export const FormWrapper = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const ItemDiv = styled.div`
  margin-bottom: 15px;
`;

export const LabelName = styled.label`
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #84fab0;
    box-shadow: 0 0 5px rgba(132, 250, 176, 0.5);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: #84fab0;
  color: #fff;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #76d89a;
  }
`;

const LocationButton = styled.button`
  background: #8fd3f4;
  color: #333;
  border: none;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 5px;

  &:hover {
    background: #6db9e3;
  }
`;

export const Singup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [signUpObject, setSignUpObject] = useState({
    userName: '',
    userEmail: '',
    userMobile: '',
    userPassword: '',
  });

  const handleSignUpButton = () => {
    const updatedSignUpObject = {
      UserName: name,
      UserEmail: email,
      UserMobile: mobile,
      UserPassword: password,
    };

    setSignUpObject(updatedSignUpObject);
    console.log("SignUp Object:", signUpObject);
    handelSuignUp(updatedSignUpObject);
  };

  const handelSuignUp = async (updatedSignUpObject) => {

    const url = backendUrl.development.localserver;
    const newUrl = `${url}/user/saveuser`;
    console.log("Hello From Submit", newUrl);

    try {
      const postUrl = await axios.post(newUrl, updatedSignUpObject);
      console.log(postUrl);
      // postUrl.data.msg === "Success" 
      // ? emptyInputField() 
      // : console.log("Unexpected response:", postUrl.data);

      if (postUrl.data.msg == "Success") {
        emptyInputField();
        navigate('/login');
      }
    }
    catch (error) {
      console.log("Something Went Wrong-->", error);
    }

  }


  const emptyInputField = () => {
    setName('');
    setEmail('');
    setMobile('');
    setPassword('');
  }

  return (
    <SingUpParentDiv>
      <FormWrapper>
        <Title>Create Your Account</Title>
        <ItemDiv>
          <LabelName>Full Name</LabelName>
          <InputField
            placeholder="Enter Full Name..."
            onInput={(e) => setName(e.target.value)}
            value={name}
          />
        </ItemDiv>
        <ItemDiv>
          <LabelName>Email Address</LabelName>
          <InputField
            type="email"
            placeholder="Enter Email Address..."
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
        </ItemDiv>
        <ItemDiv>
          <LabelName>Mobile Number</LabelName>
          <InputField
            type="tel"
            placeholder="Enter Mobile Number..."
            value={mobile}
            onInput={(e) => setMobile(e.target.value)}
          />
        </ItemDiv>
        <ItemDiv>
          <LabelName>Password</LabelName>
          <InputField
            type="password"
            placeholder="Enter Password..."
            onInput={(e) => setPassword(e.target.value)}
          />
        </ItemDiv>
        <SubmitButton onClick={handleSignUpButton}>Sign Up</SubmitButton>
      </FormWrapper>
    </SingUpParentDiv>
  );
};
