"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard-stats";
import { FileText, Folder, Upload } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Lyksia File Manager
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Fichiers
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? "..." : stats?.totalFiles || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Folder className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Dossiers</p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Upload className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Uploads cette semaine
                </p>
                <p className="text-2xl font-bold text-gray-900">-</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/dashboard/files/upload"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Upload className="h-5 w-5 mr-2 text-gray-600" />
              <span className="font-medium text-gray-700">Upload</span>
            </Link>
            <Link
              href="/dashboard/files"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FileText className="h-5 w-5 mr-2 text-gray-600" />
              <span className="font-medium text-gray-700">Fichiers</span>
            </Link>
            <Link
              href="/dashboard/folders"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Folder className="h-5 w-5 mr-2 text-gray-600" />
              <span className="font-medium text-gray-700">Dossiers</span>
            </Link>
            <Link
              href="/dashboard/api-keys"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FileText className="h-5 w-5 mr-2 text-gray-600" />
              <span className="font-medium text-gray-700">API Keys</span>
            </Link>
          </div>
        </div>

        {/* Recent files */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Fichiers récents
          </h2>
          {isLoading ? (
            <p className="text-gray-600">Chargement...</p>
          ) : stats?.recentFiles && stats.recentFiles.length > 0 ? (
            <div className="space-y-2">
              {stats.recentFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Link
                    href="/dashboard/files"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Voir
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Aucun fichier pour le moment</p>
          )}
        </div>
      </main>
    </div>
  );
}
