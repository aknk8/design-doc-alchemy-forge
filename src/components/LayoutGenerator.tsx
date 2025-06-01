
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GeneratedLayout {
  title: string;
  description: string;
  html: string;
  fields: Array<{
    id: string;
    logicalName: string;
    physicalName: string;
    dataType: string;
    required: boolean;
    inputFormat?: string;
    remarks?: string;
  }>;
}

const LayoutGenerator = () => {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState('');
  const [screenTitle, setScreenTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLayout, setGeneratedLayout] = useState<GeneratedLayout | null>(null);

  // サンプル生成結果
  const sampleLayouts = {
    '商品登録': {
      title: '商品登録画面',
      description: 'ECサイトでの商品情報を登録するための画面です。',
      html: `<div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
  <h2 class="text-2xl font-bold mb-6">商品登録</h2>
  <form class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">商品名 <span class="text-red-500">*</span></label>
      <input type="text" class="w-full p-2 border rounded" placeholder="商品名を入力してください" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">価格 <span class="text-red-500">*</span></label>
        <input type="number" class="w-full p-2 border rounded" placeholder="0" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">カテゴリー <span class="text-red-500">*</span></label>
        <select class="w-full p-2 border rounded">
          <option>選択してください</option>
          <option>衣類</option>
          <option>家電</option>
          <option>書籍</option>
        </select>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">商品説明</label>
      <textarea class="w-full p-2 border rounded h-24" placeholder="商品の詳細説明を入力してください"></textarea>
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">商品画像</label>
      <input type="file" class="w-full p-2 border rounded" accept="image/*" />
    </div>
    <div class="pt-4">
      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        商品を登録
      </button>
    </div>
  </form>
</div>`,
      fields: [
        {
          id: 'product_name',
          logicalName: '商品名',
          physicalName: 'product_name',
          dataType: '文字列',
          required: true,
          inputFormat: '全角・半角文字',
          remarks: '商品の名称'
        },
        {
          id: 'price',
          logicalName: '価格',
          physicalName: 'price',
          dataType: '数値',
          required: true,
          inputFormat: '半角数字',
          remarks: '商品の販売価格（税込）'
        },
        {
          id: 'category',
          logicalName: 'カテゴリー',
          physicalName: 'category',
          dataType: '選択',
          required: true,
          remarks: '商品のカテゴリー分類'
        },
        {
          id: 'description',
          logicalName: '商品説明',
          physicalName: 'description',
          dataType: 'テキスト',
          required: false,
          remarks: '商品の詳細説明'
        },
        {
          id: 'image',
          logicalName: '商品画像',
          physicalName: 'image',
          dataType: 'ファイル',
          required: false,
          inputFormat: '画像ファイル（JPG, PNG）',
          remarks: '商品の画像'
        }
      ]
    },
    'ユーザー': {
      title: 'ユーザー登録画面',
      description: 'ユーザーアカウントの新規登録を行う画面です。',
      html: `<div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
  <h2 class="text-2xl font-bold mb-6 text-center">ユーザー登録</h2>
  <form class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">ユーザー名 <span class="text-red-500">*</span></label>
      <input type="text" class="w-full p-2 border rounded" placeholder="山田太郎" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">メールアドレス <span class="text-red-500">*</span></label>
      <input type="email" class="w-full p-2 border rounded" placeholder="yamada@example.com" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">パスワード <span class="text-red-500">*</span></label>
      <input type="password" class="w-full p-2 border rounded" placeholder="••••••••" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">生年月日</label>
      <input type="date" class="w-full p-2 border rounded" />
    </div>
    <div class="pt-4">
      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        登録
      </button>
    </div>
  </form>
</div>`,
      fields: [
        {
          id: 'user_name',
          logicalName: 'ユーザー名',
          physicalName: 'user_name',
          dataType: '文字列',
          required: true,
          inputFormat: '全角・半角文字',
          remarks: 'ログイン時に表示される名前'
        },
        {
          id: 'email',
          logicalName: 'メールアドレス',
          physicalName: 'email',
          dataType: '文字列',
          required: true,
          inputFormat: 'email形式',
          remarks: 'ログイン認証に使用'
        },
        {
          id: 'password',
          logicalName: 'パスワード',
          physicalName: 'password',
          dataType: '文字列',
          required: true,
          inputFormat: '8文字以上',
          remarks: 'ログイン認証に使用'
        },
        {
          id: 'birth_date',
          logicalName: '生年月日',
          physicalName: 'birth_date',
          dataType: '日付',
          required: false,
          inputFormat: 'YYYY/MM/DD',
          remarks: '年齢計算に使用'
        }
      ]
    }
  };

  const handleGenerate = async () => {
    if (!requirements.trim() || !screenTitle.trim()) return;

    setIsGenerating(true);
    
    // 実際のAI生成をシミュレート
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // サンプルデータから適切なレイアウトを選択
    let selectedLayout;
    if (requirements.includes('商品') || requirements.includes('商品登録')) {
      selectedLayout = sampleLayouts['商品登録'];
    } else {
      selectedLayout = sampleLayouts['ユーザー'];
    }
    
    setGeneratedLayout({
      ...selectedLayout,
      title: screenTitle
    });
    
    setIsGenerating(false);
  };

  const handleViewInDesigner = () => {
    // 生成したレイアウトを設計書閲覧画面で表示
    navigate('/design-viewer');
  };

  const handleExportHTML = () => {
    if (!generatedLayout) return;
    
    const blob = new Blob([generatedLayout.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedLayout.title}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>要件入力</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="screen-title">画面名</Label>
              <Input
                id="screen-title"
                value={screenTitle}
                onChange={(e) => setScreenTitle(e.target.value)}
                placeholder="例: 商品登録画面"
              />
            </div>
            
            <div>
              <Label htmlFor="requirements">要件説明</Label>
              <Textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="画面の要件を自然言語で入力してください。&#10;&#10;例:&#10;- 商品の基本情報（名前、価格、カテゴリー）を入力できる画面&#10;- 商品説明と画像もアップロードできる&#10;- 必須項目にはバリデーションを設ける"
                className="min-h-[120px]"
              />
            </div>
            
            <Button 
              onClick={handleGenerate}
              disabled={!requirements.trim() || !screenTitle.trim() || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  レイアウトを生成
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {generatedLayout && (
          <Card>
            <CardHeader>
              <CardTitle>生成された項目定義</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {generatedLayout.fields.map((field) => (
                  <div key={field.id} className="p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{field.logicalName}</span>
                      <Badge variant={field.required ? "destructive" : "secondary"}>
                        {field.required ? "必須" : "任意"}
                      </Badge>
                      <Badge variant="outline">{field.dataType}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>物理名: {field.physicalName}</div>
                      {field.inputFormat && <div>形式: {field.inputFormat}</div>}
                      {field.remarks && <div>備考: {field.remarks}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        {generatedLayout ? (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{generatedLayout.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{generatedLayout.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExportHTML}>
                  <Download className="h-4 w-4 mr-2" />
                  HTMLエクスポート
                </Button>
                <Button size="sm" onClick={handleViewInDesigner}>
                  <Eye className="h-4 w-4 mr-2" />
                  設計書で確認
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg bg-gray-50 p-4">
                <div 
                  dangerouslySetInnerHTML={{ __html: generatedLayout.html }}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h4 className="font-medium mb-2">生成されたHTMLコード</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-auto max-h-40">
                  <pre>{generatedLayout.html}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>要件を入力してレイアウトを生成してください</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LayoutGenerator;
