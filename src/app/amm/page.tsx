"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";

interface CalculationResults {
  initialPrice: string;
  finalPrice: string;
  priceImpact: string;
  receiveAmount: string;
  priceRatio: string;
}

const AMMCalculator: React.FC = () => {
  const [tokenAAmount, setTokenAAmount] = useState<number>(200000);
  const [tokenBAmount, setTokenBAmount] = useState<number>(200000);
  const [swapAmount, setSwapAmount] = useState<number>(20000);
  const [swapDirection, setSwapDirection] = useState<"AtoB" | "BtoA">("AtoB");
  const [tokenASymbol, setTokenASymbol] = useState<string>("ETH");
  const [tokenBSymbol, setTokenBSymbol] = useState<string>("USDC");
  const [results, setResults] = useState<CalculationResults>({
    initialPrice: "0",
    finalPrice: "0",
    priceImpact: "0",
    receiveAmount: "0",
    priceRatio: "0",
  });

  // Calculate constant k
  const calculateK = (): number => tokenAAmount * tokenBAmount;

  // Calculate results
  const calculateResults = (): void => {
    const k = calculateK();
    let initialPrice: number,
      finalPrice: number,
      receiveAmount: number,
      newTokenAAmount: number,
      newTokenBAmount: number;

    if (swapDirection === "AtoB") {
      // Adding token A, removing token B
      initialPrice = tokenAAmount / tokenBAmount;
      newTokenAAmount = tokenAAmount + swapAmount;
      newTokenBAmount = k / newTokenAAmount;
      receiveAmount = tokenBAmount - newTokenBAmount;
      finalPrice = newTokenAAmount / newTokenBAmount;
    } else {
      // Adding token B, removing token A
      initialPrice = tokenBAmount / tokenAAmount;
      newTokenBAmount = tokenBAmount + swapAmount;
      newTokenAAmount = k / newTokenBAmount;
      receiveAmount = tokenAAmount - newTokenAAmount;
      finalPrice = newTokenBAmount / newTokenAAmount;
    }

    const priceImpact = ((finalPrice - initialPrice) / initialPrice) * 100;
    const priceRatio = finalPrice / initialPrice;

    setResults({
      initialPrice: initialPrice.toFixed(6),
      finalPrice: finalPrice.toFixed(6),
      priceImpact: priceImpact.toFixed(2),
      receiveAmount: receiveAmount.toFixed(6),
      priceRatio: priceRatio.toFixed(2),
    });
  };

  // Recalculate when inputs change
  useEffect(() => {
    calculateResults();
  }, [tokenAAmount, tokenBAmount, swapAmount, swapDirection]);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Constant Product AMM Calculator (x*y=k)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Inputs */}
            <div className="space-y-6">
              <LiquidityPoolInputs
                tokenAAmount={tokenAAmount}
                setTokenAAmount={setTokenAAmount}
                tokenBAmount={tokenBAmount}
                setTokenBAmount={setTokenBAmount}
                tokenASymbol={tokenASymbol}
                setTokenASymbol={setTokenASymbol}
                tokenBSymbol={tokenBSymbol}
                setTokenBSymbol={setTokenBSymbol}
                calculateK={calculateK}
              />

              <SwapInputs
                swapDirection={swapDirection}
                setSwapDirection={setSwapDirection}
                swapAmount={swapAmount}
                setSwapAmount={setSwapAmount}
                tokenASymbol={tokenASymbol}
                tokenBSymbol={tokenBSymbol}
              />
            </div>

            {/* Right Panel - Results */}
            <div className="space-y-6">
              <ResultsDisplay
                results={results}
                swapDirection={swapDirection}
                tokenASymbol={tokenASymbol}
                tokenBSymbol={tokenBSymbol}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Component for liquidity pool inputs
 */
interface LiquidityPoolInputsProps {
  tokenAAmount: number;
  setTokenAAmount: (amount: number) => void;
  tokenBAmount: number;
  setTokenBAmount: (amount: number) => void;
  tokenASymbol: string;
  setTokenASymbol: (symbol: string) => void;
  tokenBSymbol: string;
  setTokenBSymbol: (symbol: string) => void;
  calculateK: () => number;
}

const LiquidityPoolInputs: React.FC<LiquidityPoolInputsProps> = ({
  tokenAAmount,
  setTokenAAmount,
  tokenBAmount,
  setTokenBAmount,
  tokenASymbol,
  setTokenASymbol,
  tokenBSymbol,
  setTokenBSymbol,
  calculateK,
}) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h2 className="font-bold mb-4 text-lg border-b pb-2">
        Initial Liquidity Pool
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token A Symbol
            </label>
            <input
              type="text"
              value={tokenASymbol}
              onChange={(e) => setTokenASymbol(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="ETH"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token B Symbol
            </label>
            <input
              type="text"
              value={tokenBSymbol}
              onChange={(e) => setTokenBSymbol(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="USDC"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token A Amount
            </label>
            <input
              type="number"
              value={tokenAAmount}
              onChange={(e) =>
                setTokenAAmount(
                  Math.max(0.0001, parseFloat(e.target.value) || 0)
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token B Amount
            </label>
            <input
              type="number"
              value={tokenBAmount}
              onChange={(e) =>
                setTokenBAmount(
                  Math.max(0.0001, parseFloat(e.target.value) || 0)
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <p className="text-sm text-gray-600">
            Total Liquidity: {(tokenAAmount + tokenBAmount).toLocaleString()}{" "}
            units
          </p>
          <p className="text-sm text-gray-600">
            Constant k = {calculateK().toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Current Price: 1 {tokenASymbol} ={" "}
            {(tokenBAmount / tokenAAmount).toFixed(6)} {tokenBSymbol}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Component for swap inputs
 */
interface SwapInputsProps {
  swapDirection: "AtoB" | "BtoA";
  setSwapDirection: (direction: "AtoB" | "BtoA") => void;
  swapAmount: number;
  setSwapAmount: (amount: number) => void;
  tokenASymbol: string;
  tokenBSymbol: string;
}

const SwapInputs: React.FC<SwapInputsProps> = ({
  swapDirection,
  setSwapDirection,
  swapAmount,
  setSwapAmount,
  tokenASymbol,
  tokenBSymbol,
}) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h2 className="font-bold mb-4 text-lg border-b pb-2">Swap Parameters</h2>

      <Tabs
        defaultValue={swapDirection}
        onValueChange={(value) => setSwapDirection(value as "AtoB" | "BtoA")}
        className="mb-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="AtoB">
            Buy {tokenBSymbol} (Add {tokenASymbol})
          </TabsTrigger>
          <TabsTrigger value="BtoA">
            Buy {tokenASymbol} (Add {tokenBSymbol})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {swapDirection === "AtoB"
            ? `${tokenASymbol} Amount to Add`
            : `${tokenBSymbol} Amount to Add`}
        </label>
        <div className="flex items-center">
          <input
            type="number"
            value={swapAmount}
            onChange={(e) =>
              setSwapAmount(Math.max(0, parseFloat(e.target.value) || 0))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="ml-2 font-medium">
            {swapDirection === "AtoB" ? tokenASymbol : tokenBSymbol}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Component for displaying calculation results
 */
interface ResultsDisplayProps {
  results: CalculationResults;
  swapDirection: "AtoB" | "BtoA";
  tokenASymbol: string;
  tokenBSymbol: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  swapDirection,
  tokenASymbol,
  tokenBSymbol,
}) => {
  const priceImpactValue = parseFloat(results.priceImpact);

  return (
    <div className="bg-gray-50 p-6 rounded-md h-full flex flex-col">
      <h2 className="font-bold mb-4 text-xl">Calculation Results</h2>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="p-3 bg-white rounded-md shadow-sm">
          <span className="text-gray-600 text-sm">Initial Price:</span>{" "}
          <span className="font-medium block mt-1">
            1 {swapDirection === "AtoB" ? tokenASymbol : tokenBSymbol} ={" "}
            {results.initialPrice}{" "}
            {swapDirection === "AtoB" ? tokenBSymbol : tokenASymbol}
          </span>
        </div>

        <div className="p-3 bg-white rounded-md shadow-sm">
          <span className="text-gray-600 text-sm">Final Price:</span>{" "}
          <span className="font-medium block mt-1">
            1 {swapDirection === "AtoB" ? tokenASymbol : tokenBSymbol} ={" "}
            {results.finalPrice}{" "}
            {swapDirection === "AtoB" ? tokenBSymbol : tokenASymbol}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-white rounded-md shadow-sm">
          <span className="text-gray-600 text-sm">Price Impact:</span>{" "}
          <span
            className={`block mt-1 font-medium ${
              priceImpactValue > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {results.priceImpact}%
          </span>
        </div>

        <div className="p-3 bg-white rounded-md shadow-sm">
          <span className="text-gray-600 text-sm">Price Change Ratio:</span>{" "}
          <span className="font-medium block mt-1">{results.priceRatio}x</span>
        </div>
      </div>
    </div>
  );
};

export default AMMCalculator;
