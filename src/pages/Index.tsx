
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">設計書作成ツール</h1>
          <p className="text-xl text-gray-600">
            効率的な画面設計書の作成・閲覧・管理を支援するツールです
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/design-viewer')}>
            <CardHeader>
              <CardTitle>画面設計書の閲覧</CardTitle>
              <CardDescription>
                左右分割レイアウトで画面と項目定義を表示
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                画面レイアウトと項目の詳細定義を同時に確認できます。項目をクリックすると詳細が表示されます。
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle>画面仕様書の作成</CardTitle>
              <CardDescription>
                自然言語からHTMLレイアウトを生成
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                要件を自然言語で入力し、画面レイアウトの案を自動生成します。（準備中）
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-60">
            <CardHeader>
              <CardTitle>テストケース作成</CardTitle>
              <CardDescription>
                設計書から自動テストを生成
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                項目定義からSeleniumテストケースとテストデータを自動生成します。（準備中）
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button 
            onClick={() => navigate('/design-viewer')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            設計書閲覧を開始
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
