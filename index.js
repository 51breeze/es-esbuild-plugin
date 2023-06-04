const loader = require('es-loader');
export function plugin(options) {

    function getContext(callback){
      return {
        resourcePath:'',
        resourceQuery:'',
        resource:'',
        async(){
          return callback;
        },
        getOptions(){
          return options;
        }
      }
    }

    return {
        name: 'esLoaderPlugin',
        setup(build) {

            build.onResolve({ filter: /.es\?\w+/ }, async (args) => {
               
            })

            build.onLoad({ filter: /\.es$/ }, (args) => {
                return new Promise((resolve, reject)=>{
                    let resource = args.path.replace('&es-assets', '');
                    let [resourcePath, query] = resource.split('?');
                    let ctx = getContext((error, result, sourceMap)=>{
                        if( error ){
                            reject( error );
                        }else{
                            resolve({
                                loader: 'js',
                                contents: result
                           })
                        }
                    });
                    ctx.resourcePath = resourcePath;
                    ctx.resource = resource;
                    ctx.resourceQuery = query ? '?'+query : '';
                    loader.call(ctx, null);
                });
            });

        }
    };
}
