const bannedOrigins: string[] = [];

export const corsOptions = {
    credentials: true,
    origin: function(origin: any, callback: any) {
        if (!origin) return callback(null, true);

        if (bannedOrigins.indexOf(origin) > -1) {
            var msg =
                "The CORS policy for this site does not " +
                "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }

        return callback(null, true);
    }
};
