export const tableTitleInjector = (data) => {
  return {
    ...data,
    title: (
      <span
        style={{
          fontSize: "1.25em",
        }}
      >
        {data?.title}
      </span>
    ),
  };
};
