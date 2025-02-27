import { isFunction } from "hoolock";
import { name } from "../../../package.json";

const params = /%s/g;

const stamp = " [" + name + "]";

function template(message: string, args: any[]) {
  if (args.length) {
    const next = () => String(args.shift());
    message = message.replace(params, (a) => (args.length ? next() : a));
    while (args.length) message += ` ${next()}`;
  }
  return message + stamp;
}

function throwError(error: string): never {
  throw new Error(error);
}

const warn = /* @__PURE__ */ (() => {
  const define = (notify: (message: string) => void) => {
    function warn(message: string, ...args: any[]) {
      notify(template(message, args));
    }
    warn.sent = new Set<string>();
    warn.once = (message: string, ...args: any[]) => {
      message = template(message, args);
      if (warn.sent.has(message)) return;
      warn.sent.add(message);
      warn(message);
    };
    return warn;
  };

  if ("warn" in console && isFunction(console.warn)) {
    return define((message) => console.warn(message));
  }

  return define((message) => {
    try {
      throwError(message);
    } catch (e) {}
  });
})();

function error(message: string, ...args: any[]): never {
  throwError(template(message, args));
}

/** Throws an error in development, otherwise logs a warning. */
function debug(message: string, ...args: any[]) {
  (process.env.NODE_ENV === "development" ? error : warn)(message, ...args);
}

export { error, warn, debug };
