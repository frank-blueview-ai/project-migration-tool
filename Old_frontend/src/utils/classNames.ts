// frontend/src/utils/classNames.ts

export default function classNames(...args: Array<string | boolean | null | undefined>) {
  return args.filter(Boolean).join(" ");
}
