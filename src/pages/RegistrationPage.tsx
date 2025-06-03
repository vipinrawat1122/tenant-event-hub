
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Check } from 'lucide-react';

// Mock form schema - would come from API
const getEventFormSchema = (eventId: string) => {
  return {
    eventId,
    eventTitle: 'Tech Innovation Summit 2025',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
        required: true
      },
      {
        id: 'phone',
        type: 'tel',
        label: 'Phone Number',
        placeholder: 'Enter your phone number',
        required: true
      },
      {
        id: 'organization',
        type: 'text',
        label: 'Organization/Company',
        placeholder: 'Enter your organization',
        required: false
      },
      {
        id: 'role',
        type: 'select',
        label: 'Professional Role',
        required: true,
        options: [
          { value: 'developer', label: 'Software Developer' },
          { value: 'designer', label: 'Designer' },
          { value: 'manager', label: 'Product Manager' },
          { value: 'entrepreneur', label: 'Entrepreneur' },
          { value: 'student', label: 'Student' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        id: 'experience',
        type: 'radio',
        label: 'Years of Experience',
        required: true,
        options: [
          { value: '0-2', label: '0-2 years' },
          { value: '3-5', label: '3-5 years' },
          { value: '6-10', label: '6-10 years' },
          { value: '10+', label: '10+ years' }
        ]
      },
      {
        id: 'interests',
        type: 'checkbox',
        label: 'Areas of Interest (select all that apply)',
        options: [
          { value: 'ai', label: 'Artificial Intelligence' },
          { value: 'blockchain', label: 'Blockchain' },
          { value: 'cloud', label: 'Cloud Computing' },
          { value: 'mobile', label: 'Mobile Development' },
          { value: 'iot', label: 'Internet of Things' }
        ]
      },
      {
        id: 'dietary',
        type: 'select',
        label: 'Dietary Preferences',
        required: false,
        options: [
          { value: 'none', label: 'No restrictions' },
          { value: 'vegetarian', label: 'Vegetarian' },
          { value: 'vegan', label: 'Vegan' },
          { value: 'gluten-free', label: 'Gluten-free' },
          { value: 'other', label: 'Other (please specify in comments)' }
        ]
      },
      {
        id: 'comments',
        type: 'textarea',
        label: 'Additional Comments',
        placeholder: 'Any questions or special requirements?',
        required: false
      }
    ]
  };
};

const RegistrationPage = () => {
  const { eventId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [qrCode] = useState('QR123456789'); // Mock QR code
  
  const formSchema = getEventFormSchema(eventId || '');
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Registration data:', data);
    // Here you would submit to API
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="text-center py-12">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Registration Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for registering for {formSchema.eventTitle}. 
                  You'll receive a confirmation email shortly.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-2">Your QR Code</h3>
                <div className="bg-white p-4 rounded border-2 border-dashed border-gray-300 inline-block">
                  <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    QR Code: {qrCode}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Save this QR code for event check-in
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/events">View Other Events</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.id, { required: field.required })}
            />
            {errors[field.id] && (
              <p className="text-sm text-red-500 mt-1">This field is required</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id}>
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              {...register(field.id, { required: field.required })}
            />
            {errors[field.id] && (
              <p className="text-sm text-red-500 mt-1">This field is required</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id}>
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select onValueChange={(value) => setValue(field.id, value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[field.id] && (
              <p className="text-sm text-red-500 mt-1">This field is required</p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id}>
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <RadioGroup onValueChange={(value) => setValue(field.id, value)}>
              {field.options.map((option: any) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors[field.id] && (
              <p className="text-sm text-red-500 mt-1">This field is required</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id}>
            <Label>{field.label}</Label>
            <div className="space-y-2">
              {field.options.map((option: any) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    {...register(`${field.id}.${option.value}`)}
                  />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="outline" className="mb-6">
          <Link to={`/events/${eventId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Event
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Register for Event</CardTitle>
            <p className="text-gray-600">{formSchema.eventTitle}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {formSchema.fields.map(renderField)}
              
              <Button type="submit" className="w-full" size="lg">
                Complete Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;
