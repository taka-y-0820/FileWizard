import { Text } from "../atoms/Text";

export function Footer() {
  return (
    <footer className="bg-white shadow mt-8">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <Text className="text-center">
          &copy; 2023 FileWizard. All rights reserved.
        </Text>
      </div>
    </footer>
  );
}
