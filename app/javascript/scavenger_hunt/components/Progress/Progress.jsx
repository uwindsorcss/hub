import React, { useState, useEffect } from 'react'
import { useCurrentUserQuery } from '../../data/queries';

const Progress = () => {
  const { data: userData, loading: queryLoading } = useCurrentUserQuery();

  const renderProgress = () => {
    if ( !queryLoading ){
      return (
        <div>
          <p> You are currently at question number {userData.currentUser.progress}</p>
        </div>
      );
    }

    return null;
  }

  return (
    renderProgress()
  )
}

export {Progress};
