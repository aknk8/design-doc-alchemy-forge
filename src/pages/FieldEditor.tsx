
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FieldDefinitionForm from '@/components/FieldDefinitionForm';

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

const FieldEditor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fieldId = searchParams.get('fieldId');
  const isNew = searchParams.get('new') === 'true';
  
  const [field, setField] = useState<FieldDefinition>({
    id: '',
    logicalName: '',
    physicalName: '',
    dataType: '文字列',
    required: false,
  });

  // サンプルデータ（実際の実装では外部から取得）
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

  useEffect(() => {
    if (fieldId && !isNew) {
      const existingField = sampleFields.find(f => f.id === fieldId);
      if (existingField) {
        setField(existingField);
      }
    }
  }, [fieldId, isNew]);

  const handleSave = (updatedField: FieldDefinition) => {
    console.log('保存:', updatedField);
    // TODO: 実際の保存処理を実装
    navigate('/design-viewer');
  };

  const handleCancel = () => {
    navigate('/design-viewer');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/design-viewer')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            設計書閲覧に戻る
          </Button>
          <h1 className="text-2xl font-bold">
            {isNew ? '新規項目定義' : '項目定義編集'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isNew ? '新しい項目を定義' : `${field.logicalName}の編集`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldDefinitionForm
              field={field}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FieldEditor;
