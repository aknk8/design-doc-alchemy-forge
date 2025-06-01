
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface FieldDefinition {
  id: string;
  logicalName: string;
  physicalName: string;
  dataType: string;
  length?: number;
  required: boolean;
  defaultValue?: string;
  inputFormat?: string;
  valueRange?: string[];
  remarks?: string;
}

const sampleFields: FieldDefinition[] = [
  {
    id: "user_name",
    logicalName: "ユーザー名",
    physicalName: "user_name",
    dataType: "文字列",
    length: 50,
    required: true,
    inputFormat: "全角・半角文字",
    remarks: "ログイン時に表示される名前"
  },
  {
    id: "email",
    logicalName: "メールアドレス",
    physicalName: "email",
    dataType: "文字列",
    length: 100,
    required: true,
    inputFormat: "email形式",
    remarks: "ログイン認証に使用"
  },
  {
    id: "birth_date",
    logicalName: "生年月日",
    physicalName: "birth_date",
    dataType: "日付",
    required: false,
    inputFormat: "YYYY/MM/DD",
    remarks: "年齢計算に使用"
  },
  {
    id: "gender",
    logicalName: "性別",
    physicalName: "gender",
    dataType: "選択",
    required: false,
    valueRange: ["男性", "女性", "その他"],
    remarks: "統計情報として使用"
  }
];

const DesignViewer = () => {
  const [selectedField, setSelectedField] = useState<FieldDefinition | null>(null);

  const handleFieldClick = (fieldId: string) => {
    const field = sampleFields.find(f => f.id === fieldId);
    setSelectedField(field || null);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">画面設計書 - ユーザー登録画面</h1>
      </div>
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full p-4 overflow-auto">
            <Card>
              <CardHeader>
                <CardTitle>画面レイアウト</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold">ユーザー登録</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div 
                      className="cursor-pointer p-2 rounded border hover:bg-blue-50 transition-colors"
                      onClick={() => handleFieldClick('user_name')}
                    >
                      <label className="block text-sm font-medium mb-1">
                        ユーザー名 <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-2 border rounded pointer-events-none" 
                        placeholder="山田太郎"
                      />
                    </div>

                    <div 
                      className="cursor-pointer p-2 rounded border hover:bg-blue-50 transition-colors"
                      onClick={() => handleFieldClick('email')}
                    >
                      <label className="block text-sm font-medium mb-1">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        className="w-full p-2 border rounded pointer-events-none" 
                        placeholder="yamada@example.com"
                      />
                    </div>

                    <div 
                      className="cursor-pointer p-2 rounded border hover:bg-blue-50 transition-colors"
                      onClick={() => handleFieldClick('birth_date')}
                    >
                      <label className="block text-sm font-medium mb-1">生年月日</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border rounded pointer-events-none"
                      />
                    </div>

                    <div 
                      className="cursor-pointer p-2 rounded border hover:bg-blue-50 transition-colors"
                      onClick={() => handleFieldClick('gender')}
                    >
                      <label className="block text-sm font-medium mb-1">性別</label>
                      <select className="w-full p-2 border rounded pointer-events-none">
                        <option>選択してください</option>
                        <option>男性</option>
                        <option>女性</option>
                        <option>その他</option>
                      </select>
                    </div>

                    <div className="pt-4">
                      <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 pointer-events-none">
                        登録
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full p-4 overflow-auto">
            <Card>
              <CardHeader>
                <CardTitle>項目定義</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedField ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">{selectedField.logicalName}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">項目ID</label>
                        <p className="mt-1 font-mono text-sm bg-gray-100 p-2 rounded">{selectedField.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">物理名</label>
                        <p className="mt-1 font-mono text-sm bg-gray-100 p-2 rounded">{selectedField.physicalName}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">データ型</label>
                        <p className="mt-1">{selectedField.dataType}</p>
                      </div>
                      {selectedField.length && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">桁数</label>
                          <p className="mt-1">{selectedField.length}</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">必須/任意</label>
                        <div className="mt-1">
                          <Badge variant={selectedField.required ? "destructive" : "secondary"}>
                            {selectedField.required ? "必須" : "任意"}
                          </Badge>
                        </div>
                      </div>
                      {selectedField.defaultValue && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">初期値</label>
                          <p className="mt-1">{selectedField.defaultValue}</p>
                        </div>
                      )}
                    </div>

                    {selectedField.inputFormat && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">入力形式</label>
                        <p className="mt-1">{selectedField.inputFormat}</p>
                      </div>
                    )}

                    {selectedField.valueRange && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">値の範囲</label>
                        <div className="mt-1 space-x-2">
                          {selectedField.valueRange.map((value, index) => (
                            <Badge key={index} variant="outline">{value}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedField.remarks && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">備考</label>
                        <p className="mt-1 text-sm text-gray-700 bg-yellow-50 p-3 rounded border-l-4 border-yellow-200">
                          {selectedField.remarks}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>画面の項目をクリックして詳細を表示してください</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DesignViewer;
