# smirk-smiirl

## Instructions

1. Install the npm dependencies using `npm install`

2. Modify the development and/or production configs located in the **config** folder

    1. Provide a **wooCommerce.url**, **wooCommerce.consumerKey**, and **wooCommerce.consumerSecret**. Ensure the url has `http://` or `https://` prefix
    
    2. Add a new **port** property to override the default port if required, e.g. `port: 80`
    
3. Modify the default config located in the **config** folder if required

    1. Providing an empty value for the `*Name` properties will remove them from the response. E.g.: `lastUpdatedName: ''` 
  
4. Start the server using  `npm run start:dev` for local testing or using `npm run start:prod` for production use

5. Make sure your web server points to the IP address and port you've chosen in order to expose this app
