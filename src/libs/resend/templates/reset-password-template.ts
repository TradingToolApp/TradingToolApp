export const resetPasswordTemplate = (confirmationLink: string) => {
    return `
        <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        margin-top: 50px;
      }

      h1 {
        color: #333333;
        text-align: center;
      }

      p {
        color: #666666;
        line-height: 1.5;
      }

      .button {
        display: block;
        margin: 0 auto;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        text-align: center; /* Added to center the button */
      }
       
      .button-text {
        color: #ffffff;
        text-decoration: none;
      }
      
      .expire-time {
        text-align: center;
        margin-top: 10px;
        color: #999999;
      }
      
      .button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Reset Your Password</h1>
      <p>
        To complete your reset, please click
        the button below to change your password.
      </p>
      <a class="button" href=${confirmationLink}><span class="button-text">Reset Password</span></a>
      <p class="expire-time">TradingToolApp@dev</p>
    </div>
  </body>
</html>

    `;
};