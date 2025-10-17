import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Dummy() {
  return (
    <View>
      <Text>dummy:</Text>
      <Link href={"/(protected)"} asChild>
        <Button title="Go to /(protected)" />
      </Link>
      <Link href={"/"} asChild>
        <Button title="Go to /" />
      </Link>
    </View>
  );
}