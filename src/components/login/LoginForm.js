import React, { forwardRef } from 'react';

const LoginForm = forwardRef((props, ref) => {
  const { isLoading, isFail, isValid, onSubmit } = props;

  // Title
  const title = (
    <legend className="card-header">Login</legend>
  )

  // Username
  const username = (
    <div class="form-group">
      <input 
        ref={ref.username}
        className="form-control"
        name="username"
        placeholder="Username (not case sensitive)"
        type="text"
        aria-label="Username" />
    </div>
  )

  // Password
  const password = (
    <div class="form-group">
      <input
        ref={ref.password}
        className="form-control"
        name="password"
        placeholder="Password (case sensitive)"
        type="password"
        aria-label="Password" />
    </div>
  )

  // Submit
  const submit = (
    <div class="form-group">
      <button className="btn btn-primary" type="submit">Login</button>
    </div>
  )

  // Error
  const error = !isValid ? (
    <p class="alert alert-dismissible alert-danger">
      Both username and password are required
    </p>
  ) : null;

  // No usere
  const noUser = isFail ? (
    <p>
      The username or password does not exist
    </p>
  ) : null;

  // Spinner
  const spinner = isLoading ? (
    <div className="progress">
      <div className="progress-bar progress-bar-striped bg-info" style={{ width: "100%" }} role="progressbar"  aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  ) : null;

  const cardClass = isFail ? 'bg-danger' : 'bg-secondary';

  return (
    <form className={`card text-white ${cardClass} mb-3 login-form`} onSubmit={onSubmit}>
      {/* Title */}
      {title}

      <div className="card-body">
        {/* Username */}
        {username}

        {/* Password */}
        {password}

        {/* Submit */}
        {submit}

        {/* Error */}
        {error}

        {/* No User */}
        {noUser}
      </div>

      {/* Spinner */}
      {spinner}
    </form>
  )
})

export default LoginForm;