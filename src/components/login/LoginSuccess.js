import React from 'react';

const LoginSuccess = ({ user }) => {
  // Title
  const title = user.name ? (
    <p className="card-header">Welcome, <strong>{user.name}</strong>. May the force be with you!</p>
  ) : null;

  return (
    <div className="card text-white bg-success mb-3">
      {/* Title */}
      {title}
    </div>
  )
}

export default LoginSuccess;