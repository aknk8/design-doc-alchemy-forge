
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

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

interface FieldDefinitionFormProps {
  field: FieldDefinition;
  onSave: (field: FieldDefinition) => void;
  onCancel: () => void;
}

const FieldDefinitionForm = ({ field, onSave, onCancel }: FieldDefinitionFormProps) => {
  const [formData, setFormData] = useState<FieldDefinition>(field);
  const [newRangeValue, setNewRangeValue] = useState('');

  const dataTypeOptions = [
    '文字列',
    '数値',
    '日付',
    '選択',
    'チェックボックス',
    'テキストエリア'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof FieldDefinition, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addRangeValue = () => {
    if (newRangeValue.trim()) {
      const currentRange = formData.valueRange || [];
      setFormData(prev => ({
        ...prev,
        valueRange: [...currentRange, newRangeValue.trim()]
      }));
      setNewRangeValue('');
    }
  };

  const removeRangeValue = (index: number) => {
    const currentRange = formData.valueRange || [];
    setFormData(prev => ({
      ...prev,
      valueRange: currentRange.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="id">項目ID *</Label>
          <Input
            id="id"
            value={formData.id}
            onChange={(e) => handleInputChange('id', e.target.value)}
            placeholder="user_name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logicalName">論理名 *</Label>
          <Input
            id="logicalName"
            value={formData.logicalName}
            onChange={(e) => handleInputChange('logicalName', e.target.value)}
            placeholder="ユーザー名"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="physicalName">物理名 *</Label>
          <Input
            id="physicalName"
            value={formData.physicalName}
            onChange={(e) => handleInputChange('physicalName', e.target.value)}
            placeholder="user_name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataType">データ型 *</Label>
          <Select
            value={formData.dataType}
            onValueChange={(value) => handleInputChange('dataType', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dataTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(formData.dataType === '文字列' || formData.dataType === '数値') && (
          <div className="space-y-2">
            <Label htmlFor="length">桁数</Label>
            <Input
              id="length"
              type="number"
              value={formData.length || ''}
              onChange={(e) => handleInputChange('length', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="50"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="inputFormat">入力形式</Label>
          <Input
            id="inputFormat"
            value={formData.inputFormat || ''}
            onChange={(e) => handleInputChange('inputFormat', e.target.value)}
            placeholder="YYYY/MM/DD"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="defaultValue">初期値</Label>
          <Input
            id="defaultValue"
            value={formData.defaultValue || ''}
            onChange={(e) => handleInputChange('defaultValue', e.target.value)}
            placeholder="デフォルト値"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="required"
          checked={formData.required}
          onCheckedChange={(checked) => handleInputChange('required', checked)}
        />
        <Label htmlFor="required">必須項目</Label>
      </div>

      {formData.dataType === '選択' && (
        <div className="space-y-4">
          <div>
            <Label>値の範囲（選択肢）</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newRangeValue}
                onChange={(e) => setNewRangeValue(e.target.value)}
                placeholder="選択肢を入力"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRangeValue())}
              />
              <Button type="button" onClick={addRangeValue}>
                追加
              </Button>
            </div>
          </div>
          
          {formData.valueRange && formData.valueRange.length > 0 && (
            <div className="space-y-2">
              <Label>現在の選択肢:</Label>
              <div className="flex flex-wrap gap-2">
                {formData.valueRange.map((value, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {value}
                    <button
                      type="button"
                      onClick={() => removeRangeValue(index)}
                      className="ml-2 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="remarks">備考</Label>
        <Textarea
          id="remarks"
          value={formData.remarks || ''}
          onChange={(e) => handleInputChange('remarks', e.target.value)}
          placeholder="項目に関する補足情報"
          rows={3}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          保存
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          キャンセル
        </Button>
      </div>
    </form>
  );
};

export default FieldDefinitionForm;
