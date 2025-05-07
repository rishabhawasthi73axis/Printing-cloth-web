
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2 } from 'lucide-react';

// Sample categories data
const sampleCategories = [
  { id: 1, name: 'T-Shirts', productCount: 12 },
  { id: 2, name: 'Hoodies', productCount: 8 },
  { id: 3, name: 'Caps', productCount: 5 },
  { id: 4, name: 'Mugs', productCount: 7 },
  { id: 5, name: 'Posters', productCount: 3 },
];

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState(sampleCategories);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<{ id: number, name: string } | null>(null);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newId = Math.max(...categories.map(c => c.id), 0) + 1;
      setCategories([...categories, { id: newId, name: newCategory, productCount: 0 }]);
      setNewCategory('');
    }
  };

  const handleEditCategory = (id: number, name: string) => {
    setEditingCategory({ id, name });
  };

  const handleSaveEdit = () => {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: editingCategory.name } 
          : cat
      ));
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Categories Management</h2>
      
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
          <CardDescription>Create a new product category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <Label htmlFor="new-category" className="mb-2 block">Category Name</Label>
              <Input 
                id="new-category" 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value)} 
                placeholder="Enter new category name"
              />
            </div>
            <Button onClick={handleAddCategory} className="flex items-center gap-1">
              <Plus size={16} />
              <span>Add Category</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription>Edit or delete existing categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map(category => (
              <div key={category.id} className="flex items-center justify-between p-3 border rounded-md bg-white hover:bg-gray-50">
                <div>
                  {editingCategory?.id === category.id ? (
                    <Input 
                      className="w-60"
                      value={editingCategory.name} 
                      onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    />
                  ) : (
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.productCount} products</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {editingCategory?.id === category.id ? (
                    <Button size="sm" variant="outline" onClick={handleSaveEdit}>
                      Save
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => handleEditCategory(category.id, category.name)}>
                      <Pencil size={16} />
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteCategory(category.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;