import { Title } from "../atoms/Text";

function WizardHatLogo() {
  return (
    <svg
      className="w-10 h-10 text-purple-600"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L3 9L12 16L21 9L12 2Z" fill="currentColor" />
      <path
        d="M3 9V17L12 22L21 17V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12L12 15L17 12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <WizardHatLogo />
          <div>
            <Title className="text-white text-3xl font-extrabold">
              FileWizard
            </Title>
            <p className="text-purple-200 text-sm">
              Magically organize your files
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -mt-4 mr-4 w-24 h-24 bg-purple-500 rounded-full filter blur-2xl opacity-50 animate-pulse"></div>
      <div className="absolute top-0 left-1/2 -mt-8 ml-8 w-32 h-32 bg-indigo-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
    </header>
  );
}
