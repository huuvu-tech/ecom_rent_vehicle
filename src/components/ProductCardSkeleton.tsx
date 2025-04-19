import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card 
      sx={{ 
        height: 400,
        display: 'flex', 
        flexDirection: 'column',
      }}
    >
      <Skeleton 
        variant="rectangular" 
        height={200} 
        sx={{ 
          bgcolor: 'grey.200',
          borderRadius: '4px 4px 0 0'
        }} 
      />
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        height: 200,
        p: 2
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="rectangular" width={80} height={24} />
        </Box>
        
        <Skeleton variant="text" width="100%" height={60} sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="rectangular" width={120} height={24} />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mt: 'auto'
        }}>
          <Box>
            <Skeleton variant="text" width={80} height={32} />
            <Skeleton variant="text" width={60} height={16} />
          </Box>
          <Skeleton variant="rectangular" width={100} height={36} />
        </Box>
      </CardContent>
    </Card>
  );
}; 