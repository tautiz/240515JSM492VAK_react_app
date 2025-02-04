import React from 'react';
import Card from '../../components/Cards/Card';
import PostsWithAbort from '../../components/PostsWithAbort';
import UnifiedComponent from '../../components/UnifiedComponent';
import { DynamicQuery, SearchFilter, CreatePost, Pagination, PostWithComments } from '../../components/APIintegracijos';
import Posts from '../../components/Posts';
import Posts2 from '../../components/Posts2';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Hr from '../../components/Hr';

export default function ApiIntegrationPage() {
  const queryClient = new QueryClient();

  return (
    <>
      <Hr text="API integracija" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card span={2}>
          <PostsWithAbort/>
        </Card>
        <Card span={2}>
          <UnifiedComponent />
        </Card>
        <Card>
          <DynamicQuery />
        </Card>
        <Card>
          <SearchFilter />
        </Card>
        <Card>
          <CreatePost />
        </Card>
        <Card>
          <Pagination />
        </Card>
        <Card>
          <PostWithComments />
        </Card>
        <Card>
          <Posts />
        </Card>
        <Card>
          <QueryClientProvider client={queryClient}>
            <Posts2 />
          </QueryClientProvider>
        </Card>
      </div>
    </>
  );
}