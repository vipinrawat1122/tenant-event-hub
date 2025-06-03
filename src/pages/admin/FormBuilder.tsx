
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

const FormBuilder = () => {
  const [fields, setFields] = useState<FormField[]>([
    { id: '1', type: 'text', label: 'Full Name', required: true },
    { id: '2', type: 'email', label: 'Email Address', required: true },
    { id: '3', type: 'tel', label: 'Phone Number', required: false },
  ]);

  const [newField, setNewField] = useState({
    type: 'text',
    label: '',
    required: false,
    options: ''
  });

  const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Phone Number' },
    { value: 'number', label: 'Number' },
    { value: 'select', label: 'Dropdown' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'checkbox', label: 'Checkboxes' },
    { value: 'textarea', label: 'Text Area' },
  ];

  const addField = () => {
    if (newField.label.trim()) {
      const field: FormField = {
        id: Date.now().toString(),
        type: newField.type,
        label: newField.label,
        required: newField.required,
      };

      if (newField.type === 'select' || newField.type === 'radio' || newField.type === 'checkbox') {
        field.options = newField.options.split(',').map(opt => opt.trim()).filter(opt => opt);
      }

      setFields([...fields, field]);
      setNewField({ type: 'text', label: '', required: false, options: '' });
    }
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const renderFieldPreview = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return <Input placeholder={`Enter ${field.label.toLowerCase()}`} disabled />;
      case 'textarea':
        return <textarea className="w-full p-2 border rounded" rows={3} placeholder={`Enter ${field.label.toLowerCase()}`} disabled />;
      case 'select':
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
          </Select>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" name={field.id} disabled />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox disabled />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </div>
        );
      default:
        return <Input disabled />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Form Builder</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Add Form Fields</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fieldType">Field Type</Label>
              <Select value={newField.type} onValueChange={(value) => setNewField({...newField, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fieldLabel">Field Label</Label>
              <Input
                id="fieldLabel"
                value={newField.label}
                onChange={(e) => setNewField({...newField, label: e.target.value})}
                placeholder="Enter field label"
              />
            </div>

            {(newField.type === 'select' || newField.type === 'radio' || newField.type === 'checkbox') && (
              <div>
                <Label htmlFor="fieldOptions">Options (comma separated)</Label>
                <Input
                  id="fieldOptions"
                  value={newField.options}
                  onChange={(e) => setNewField({...newField, options: e.target.value})}
                  placeholder="Option 1, Option 2, Option 3"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={newField.required}
                onCheckedChange={(checked) => setNewField({...newField, required: checked as boolean})}
              />
              <Label htmlFor="required">Required field</Label>
            </div>

            <Button onClick={addField} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </CardContent>
        </Card>

        {/* Form Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Form Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="border rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <Label className="font-medium">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeField(field.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {renderFieldPreview(field)}
                </div>
              ))}

              {fields.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No fields added yet. Add some fields to see the preview.
                </div>
              )}

              <Button className="w-full mt-4" disabled>
                Submit Registration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button className="bg-green-600 hover:bg-green-700">
          Save Form
        </Button>
      </div>
    </div>
  );
};

export default FormBuilder;
