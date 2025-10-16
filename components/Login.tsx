import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useState } from "react";
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

const InitialValue: User = {
  user_name_email: "",
  password: "",
};

export function LoginForm() {
  const { userData, isAuthenticated } = useAuthStore();
  const { loginMutation, isLoginError, isLoginLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: InitialValue,
    onSubmit: async ({ value }) => {
      console.log(value);
      loginMutation({ email: value.user_name_email, password: value.password });
    },
  });
  useEffect(() => {
    console.log("clgx", isAuthenticated, userData);
  }, [userData]);

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
          <form.Field name="user_name_email">
            {(field) => (
              <Input
                placeholder="Username or Email"
                value={field.state.value}
                onChangeText={(text) => field.handleChange(text)}
              />
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Input
                  value={form.getFieldValue("password")}
                  onChangeText={(text) => field.handleChange(text)}
                  placeholder="password"
                  textContentType="password"
                  secureTextEntry={!showPassword}
                />
                <Button
                  icon={!showPassword ? Eye : EyeOff}
                  size="$2"
                  rounded={"$true"}
                  width={"min-content"}
                  height={"100%"}
                  onPress={() => setShowPassword((prev) => !prev)}
                />
              </View>
            )}
          </form.Field>

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
