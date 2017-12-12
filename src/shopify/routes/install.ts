import { Request, Response, Router } from "express";
import { Error } from "mongoose";
import { Shop, ShopModel } from "../models/Shop";
const cookie = require("cookie");
const nonce = require("nonce")();
const querystring = require("querystring");
const request = require("request-promise");
const verifyQueryHMAC = require("../helpers").verifyQueryHMAC;
const shopAdminAPI = require("../helpers").shopAdminAPI;
const router = Router();
const scopes = "read_products,write_products,write_themes,write_orders,read_orders";
const forwardingAddress = "https://shopify-tracified.herokuapp.com";
const apiKey = "7f3bc78eabe74bdca213aceb9cfcc1f4";
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";

//installation route
router.get("/", (req: Request, res: Response) => {
  const shop = req.query.shop;
  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress + "/shopify/install/callback";
    const installUrl = "https://" + shop +
      "/admin/oauth/authorize?client_id=" + apiKey +
      "&scope=" + scopes +
      "&state=" + state +
      "&redirect_uri=" + redirectUri;

    res.cookie("state", state);
    res.redirect(installUrl);
  } else {
    return res.status(400).send("Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request");
  }
});

//callback url on app installation
router.get("/callback", (req: Request, res: Response) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;

  if (state !== stateCookie) {
    return res.status(403).send("Request origin cannot be verified");
  }

  if (shop && hmac && code) {
    if (!verifyQueryHMAC(req.query, apiSecret)) {
      return res.status(400).send("HMAC validation failed");
    }
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };

    shopAdminAPI("POST", shop, "/admin/oauth/access_token", null, accessTokenPayload, function (accessTokenResponse: any) {

      const accessToken = accessTokenResponse.access_token;
      Shop.findOne({ "name": shop }, "name access_token", function (err: Error, installedShop: ShopModel) { //to use if a shop record is alredy there
        if (err) return res.status(503).send("error with db connection. Plese try again in a while");
        if (installedShop) {
          installedShop.access_token = accessToken;
          installedShop.save(function () {
            if (err) return res.status(503).send("error with db connection. Plese try again in a while");
          });
        }
        else {
          var ShopInstance = new Shop({ name: shop, access_token: accessToken });

          ShopInstance.save((err: Error) => {
            if (err) {
              if (err) return res.status(503).send("error with db connection. Plese try again in a while");
            }
          });
        }
      });

      const shopRequestHeaders = {
        "X-Shopify-Access-Token": accessToken,
      };

      //get the theme id for asset uploading
      shopAdminAPI("GET", shop, "/admin/themes.json", shopRequestHeaders, null, (parsedBody: any) => {

        var theme_id;
        var themes = parsedBody.themes;
        for (var i = 0; i < themes.length; i++) {
          if (themes[i].role == "main") {
            theme_id = themes[i].id;
            console.log(theme_id);
            break;
          }
        }

        //asset uploading
        //var timestamp = new Date().getTime();
        const assetUploadURL = "/admin/themes/" + theme_id + "/assets.json";

        const snippetUploadPayload = {
          "asset": {
            "key": "snippets\/tracified.liquid",
            "attachment": "R0lGODlhAQABAPABAP\/\/\/wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
          }
        };
        shopAdminAPI("PUT", shop, assetUploadURL, shopRequestHeaders, snippetUploadPayload, (parsedBody: any) => {
          console.log("snippet uploaded");
          console.log(parsedBody);
        });

        const jsUploadPayload = {
          "asset": {
            "key": "assets\/tracified.js",
            "attachment": "R0lGODlhAQABAPABAP\/\/\/wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
          }
        };
        shopAdminAPI("PUT", shop, assetUploadURL, shopRequestHeaders, jsUploadPayload, (parsedBody: any) => {
          console.log("js uploaded");
          console.log(parsedBody);
        });

        const cssUploadPayload = {
          "asset": {
            "key": "assets\/tracified.css",
            "attachment": "R0lGODlhAQABAPABAP\/\/\/wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
          }
        };
        shopAdminAPI("PUT", shop, assetUploadURL, shopRequestHeaders, cssUploadPayload, (parsedBody: any) => {
          console.log("css uploaded");
          console.log(parsedBody);
        });

        const bootstrapcssUploadPayload = {
          "asset": {
            "key": "assets\/bootstrap.min.css",
            "attachment": "R0lGODlhAQABAPABAP\/\/\/wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
          }
        };
        shopAdminAPI("PUT", shop, assetUploadURL, shopRequestHeaders, bootstrapcssUploadPayload, (parsedBody: any) => {
          console.log("bootstrapcss uploaded");
          console.log(parsedBody);
        });

        const bootstrapjsUploadPayload = {
          "asset": {
            "key": "assets\/bootstrap.min.js",
            "attachment": "R0lGODlhAQABAPABAP\/\/\/wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
          }
        };
        shopAdminAPI("PUT", shop, assetUploadURL, shopRequestHeaders, bootstrapjsUploadPayload, (parsedBody: any) => {
          console.log("bootstrapcss uploaded");
          console.log(parsedBody);
        });

        const jqueryUploadPayload = {
          "asset": {
            "key": "assets\/jquery.min.js",
            "attachment": "R0lGODlhAQABAPABAP\/\/\/wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
          }
        };
        shopAdminAPI("PUT", shop, assetUploadURL, shopRequestHeaders, jqueryUploadPayload, (parsedBody: any) => {
          console.log("bootstrapcss uploaded");
          console.log(parsedBody);
        });

        const mdbUploadPayload = {
          "asset": {
            "key": "assets\/mdb.min.css",
            "attachment": "R0lGODlhAQABAPABAP\/\/\/wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
          }
        };
        shopAdminAPI("PUT", shop, assetUploadURL, shopRequestHeaders, mdbUploadPayload, (parsedBody: any) => {
          console.log("bootstrapcss uploaded");
          console.log(parsedBody);
        });

      });

      //register uninstallation webhook
      const uninstallWHPayload = {
        "webhook": {
          "topic": "app/uninstalled",
          "address": forwardingAddress + "/shopify/webhook/uninstall-app",
          "format": "json"
        }
      };
      shopAdminAPI("POST", shop, "/admin/webhooks.json", shopRequestHeaders, uninstallWHPayload, (parsedBody: any) => {
        console.log("uninstall webhook registered");
      });
      res.redirect("https://" + shop + "/admin/apps");
    });

  } else {
    res.status(400).send("Required parameters missing");
  }
});

export { router };