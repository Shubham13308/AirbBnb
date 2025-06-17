'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { useFormSubmit } from '@/app/hooks/useFormSubmit';
import { useDispatch } from 'react-redux';
import { updateUserData } from '@/app/redux/actions/userAction';
import { useRedirect } from '@/app/hooks/useRedirect';
const ProfileComponent = () => {
  const user = useSelector((state) => state?.user?.user || null);
  const {submitForm}=useFormSubmit();
  const dispatch = useDispatch();
  const redirectTo = useRedirect();
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    image: user?.image || '',
  });
  
  const [preview, setPreview] = useState(user?.image || '');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files.length > 0) {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file)); 
    } else {
      setForm({ ...form, [name]: value });
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updated Profile:', form);
    const token = localStorage.getItem('token')
    const formData = new FormData();
    formData.append('username',form.username)
    formData.append('email',form.email);
    formData.append('password',form.password);
    formData.append('image',form.image);
    formData.append('token',token)
    await submitForm({
        url:'/api/update/update-profile',
        method: 'PUT',
        formData,
        onSuccess: (result) => {
          dispatch(updateUserData({
            username: result.user.username,
            email: result.user.email,
            image: result.user.image, 
          }));
          setForm({ ...form, password: '' }); 
          redirectTo('/')
        }
        
    })

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-xl">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-20 w-20">
                <AvatarImage src={preview} alt={form.username} />
                <AvatarFallback>{form.username?.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input
                name="image"
                id="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Enter new password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileComponent;
