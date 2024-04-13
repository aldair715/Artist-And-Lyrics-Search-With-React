const Conexion = () => {
  const customFetch = async (VALUES) => {
    let { link, options } = VALUES,
      defaultHeader = {
        accept: "application/json",
      };
    link = new String(link).toString();
    const controller = new AbortController();
    options.signal = controller.signal;
    options.method = options.method ? options.method : "GET";
    options.headers = options.headers
      ? { ...options.headers, ...defaultHeader }
      : defaultHeader;
    options.body = options.body ? JSON.stringify(options.body) : false;
    if (!options.body) delete options.body;
    setTimeout(() => controller.abort(), 5000);
    console.log(link);
    return fetch(link, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              error: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrio un error",
            })
      )
      .catch((error) => error);
  };
  const get = (VALUES) => {
    const { link, options = {} } = VALUES;
    return customFetch({ link, options });
  };
  return {
    get,
  };
};
export default Conexion;
