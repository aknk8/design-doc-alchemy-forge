
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LayoutGenerator from '@/components/LayoutGenerator';

const SpecificationCreator = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            ホームに戻る
          </Button>
          <h1 className="text-2xl font-bold">画面仕様書の作成</h1>
          <p className="text-gray-600 mt-2">
            自然言語で要件を入力すると、HTMLレイアウトを自動生成します
          </p>
        </div>

        <LayoutGenerator />
      </div>
    </div>
  );
};

export default SpecificationCreator;
