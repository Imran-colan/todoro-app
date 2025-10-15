import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@tanstack/react-form";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Form, Input, Spinner, Stack, Text, View } from "tamagui";

const Login = () => {
  return (
    <View>
      <LoginForm />
    </View>
  );
};

interface User {
  user_name_email: string;
  password: string;
}

const InitialValue: User = { user_name_email: "", password: "" };

export function LoginForm() {
  const { loginMutation, isLoginError, isLoginLoading } = useAuth();

  const form = useForm({
    defaultValues: InitialValue,
    onSubmit: async ({ value }) => {
      console.log(value);
      loginMutation({ email: value.user_name_email, password: value.password });
    },
  });

  return (
    <Stack
      gap="$4"
      borderWidth={3}
      borderColor="$borderColorFocus"
      borderCurve="continuous"
      p={12}
    >
      <Form onSubmit={form.handleSubmit}>
        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <Text>Login</Text>
        </View>
        <View style={{ gap: 12 }}>
          <Input placeholder="Username or Email" />
          <Input
            placeholder="password"
            textContentType="password"
            secureTextEntry={true}
          />
          <Form.Trigger asChild disabled={isLoginLoading}>
            <Button icon={isLoginLoading ? () => <Spinner /> : undefined}>
              Login
            </Button>
          </Form.Trigger>
          {isLoginError && <Text>{isLoginError}</Text>}
        </View>
      </Form>
    </Stack>
  );
}

export default Login;

const styles = StyleSheet.create({});
