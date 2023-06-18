function request<T>(
  input: RequestInfo | URL,
  options?: RequestInit
): Promise<T> {
  return new Promise((resolve, reject) =>
    fetch(input, options)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject)
  )
}

export default request
