# react-fetching

Some example components and example uses to show how composable containers
with render properties and TypeScript classes can work.

The example code runs using webpack, which is not yet set up for hot module
replacement.

The basic structure of the components is (planned extensions in brackets):

````
    FetcherBasic <>---+---- FetcherSimple
                      +---- [FetcherWithProvider]
````

Note how we are using composition instead of inheritance: FetcherSimple uses
FetcherBasic for it's handling of the promise; itself dealing with the
translation from url to `fetch`-function.

(NB: I am not completely sure that using the word "fetch" here was a good idea,
since it might lead to some confusion whether it's just the generic act of
fetching something or whether the w3 fetch function is what I'm talking about --
`FetcherSimple` uses `fetch` to obtain the data from the URL given and provides
a prop called `fetch` to the `FetcherBasic` component.)

The `FetcherBasic` implements fetching by calling a function that is provided
in it's props and returns a promise, render is a function taking the (optional)
result data, an optional error and a flag that is true while the promise has
not been resolved:

````
    <FetcherBasic fetch={()=>Promise.resolve(1)}
                  render={(data, error, loading) => {
                    if (loading) return <div className="loading"></div>;
                    if (error)   return <div className="error">Something went wrong: {error}</div>;
                    return <div>{data}</div>;
                  }} />
````

For the `FetcherSimple`, the fetch callback is replaced with a URL and
(optionally) fetchOptions, which provide the `RequestInit` parameter for fetch:

````
    <FetcherSimple url="/api/data/example.json"
                   fetchOptions={{ credentials: 'same-origin' }}
                   render={(data, error, loading) => {
                     if (loading) return <div className="loading"></div>;
                     if (error)   return <div className="error">Something went wrong: {error}</div>;
                     return <div><pre>{JSON.stringify(data,null,2)}</pre></div>;
                   }} />
````

The next component will show how the task of actually fetching data can easily
be delegated to a provider which will also provide some caching so that
different parts of the page can use the same data returned by the server.

The basic idea for the setup is to have one component put the Provider into
the react context and then later on have container components use that Provider
to obtain the data. The `FetcherBasic` component will be used to implement the
promise handling in this scenario.
