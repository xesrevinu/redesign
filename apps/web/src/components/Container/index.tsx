import clsx from 'clsx';
import React, { ReactNode } from 'react';

import mainStyles from '@/styles/main.module.css';

export const Container = ({ children }: { children: ReactNode }) => {
  // TODO:
  const cls = '';

  return (
    <div>
      <div
        className={clsx('w-full h-full fixed', mainStyles['dark-bg'])}
        style={{
          filter: 'blur(1px)',
          transform: 'scale(1.1)',
          top: 0,
          zIndex: 1,
        }}
      />
      <div
        className="relative min-h-screen overflow-hidden flex items-center"
        style={{ zIndex: 2 }}
      >
        {children}
      </div>
    </div>
  );
};
