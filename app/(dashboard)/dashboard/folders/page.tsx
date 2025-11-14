'use client';

import { useState } from 'react';
import { useFolderList, useFolderCreate, useFolderDelete } from '@/features/folder/hooks/use-folders';
import { Folder as FolderIcon, Plus, Trash2, Loader2 } from 'lucide-react';

export default function FoldersPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const { data: folders, isLoading } = useFolderList();
  const createMutation = useFolderCreate();
  const deleteMutation = useFolderDelete();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    await createMutation.mutateAsync({ name: newFolderName });
    setNewFolderName('');
    setShowCreateForm(false);
  };

  const handleDelete = async (folderId: string, folderName: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le dossier "${folderName}" ?`)) {
      await deleteMutation.mutateAsync(folderId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dossiers</h1>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nouveau dossier
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Create form */}
        {showCreateForm && (
          <div className="mb-6 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Créer un nouveau dossier</h2>
            <form onSubmit={handleCreate} className="flex gap-2">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Nom du dossier..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                disabled={createMutation.isPending || !newFolderName.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Créer
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewFolderName('');
                }}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Annuler
              </button>
            </form>
          </div>
        )}

        {/* Folders list */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : folders && folders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="bg-white border rounded-lg p-4 hover:shadow-lg transition group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FolderIcon className="w-10 h-10 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate" title={folder.name}>
                        {folder.name}
                      </h3>
                      <p className="text-sm text-gray-500 truncate" title={folder.path}>
                        {folder.path}
                      </p>
                      {folder._count && (
                        <p className="text-xs text-gray-400 mt-1">
                          {folder._count.files} fichier{folder._count.files > 1 ? 's' : ''} • {folder._count.children} sous-dossier{folder._count.children > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(folder.id, folder.name)}
                    disabled={deleteMutation.isPending}
                    className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded transition"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FolderIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">Aucun dossier créé</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Créer votre premier dossier
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
