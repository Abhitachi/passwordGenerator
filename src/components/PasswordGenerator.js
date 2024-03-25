import React, { useState } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState({
    upperCase: false,
    lowerCase: false,
    numbers: false,
    symbols: false,
    length: 8,
  });

  const [textPassword, setTextPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleLowerCase = () => {
    setPassword({ ...password, lowerCase: !password.lowerCase });
  };
  const handleUpperCase = () => {
    setPassword({ ...password, upperCase: !password.upperCase });
  };
  const handleNumbers = () => {
    setPassword({ ...password, numbers: !password.numbers });
  };
  const handleSymbols = () => {
    setPassword({ ...password, symbols: !password.symbols });
  };

  const setPasswordLength = (num) => {
    const parsedNum = parseInt(num);
    if (parsedNum >= 8 && parsedNum <= 50) {
      setPassword({
        ...password,
        length: parsedNum,
      });
    }
  };

  const helper = () => {
    const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const symbolsArray = "!@#$%^&*()".split("");
    const lowerCaseArray = "abcdefghijklmnopqrstuvwxyz".split("");
    const upperCaseArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const { length, upperCase, lowerCase, numbers, symbols } = password;

    const generatePassword = (
      length,
      upperCase,
      lowerCase,
      numbers,
      symbols
    ) => {
      const availableCharacter = [
        ...(lowerCase ? lowerCaseArray : []),
        ...(upperCase ? upperCaseArray : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];

      const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
      const Characters = shuffleArray(availableCharacter).slice(0, length);
      setTextPassword(Characters.join(""));
      console.log(Characters);
      return Characters;
    };
    generatePassword(length, upperCase, lowerCase, numbers, symbols);
  };

  //

  return (
    <div className="mx-auto text-center w-9/12 my-2">
      <h1 className="py-2 my-2 text-xl font-bold">Password Generators</h1>
      <div className="flex justify-center gap-4 text-center">
        <input
          type="text"
          disabled
          value={textPassword}
          className="border-2 border-slate-500"
        />
        <button
          className="bg-orange-300 px-3 py-1 rounded-md text-white font-semibold"
          onClick={() => {
            if (textPassword.length > 0) {
              navigator.clipboard.writeText(textPassword);
              setCopied(true);
              setInterval(() => setCopied(false), 2000);
            }
          }}
        >
          {copied ? "Copied!" : "Copy text"}
        </button>
      </div>
      <div className="flex justify-center gap-4 text-center mt-2 ">
        <span className="py-2">Select Password Length(8 - 50 Character)</span>
        <input
          type="number"
          min={8}
          max={50}
          value={password.length}
          className="border-2 border-slate-500 text-black "
          onChange={(e) => setPasswordLength(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="text-center">
          <input
            type="checkbox"
            value={password.upperCase}
            onChange={handleUpperCase}
          />
          <span>Include UpperCase</span>
        </div>

        <div className="text-center">
          <input
            type="checkbox"
            value={password.lowerCase}
            onChange={handleLowerCase}
          />
          <span>Include LowerCase</span>
        </div>

        <div className="text-center">
          <input
            type="checkbox"
            value={password.numbers}
            onChange={handleNumbers}
          />
          <span>Include Numbers</span>
        </div>

        <div className="text-center">
          <input
            type="checkbox"
            value={password.symbols}
            onChange={handleSymbols}
          />
          <span>Include Symbols</span>
        </div>
      </div>
      <button
        className="bg-red-400 px-4 py-2 rounded-md text-lg font-bold mt-2 "
        onClick={helper}
      >
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;
