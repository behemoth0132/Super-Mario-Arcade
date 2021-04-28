// ...

const CharacterBox = React.forwardRef(
    (
      {
        isSelected,
        type,
        headerProps = {},
        imgProps = {},
        src,
        disableFlashing,
        ...rest
      },
      ref,
    ) => (
      <div
        ref={ref}
        className={cx(styles.characterBox, {
          [styles.selectedBox]: isSelected,
        })}
        {...rest}
      >
        {type && <h3 {...headerProps}>{type}</h3>}
        <img
          {...imgProps}
          src={src || imgProps.src}
          className={cx(styles.tier2, imgProps.className, {
            [styles.selected]: isSelected,
            [styles.noAnimation]: !!disableFlashing,
          })}
          alt=""
        />
      </div>
    ),
  )