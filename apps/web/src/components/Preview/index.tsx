import { useGenerateContext, useGenerateStore } from '@/core/generate/hooks';

import { Post } from '../Post';

// test content
const content = `
Configure a CNAME record
The names of the fields and what to actually enter to configure the record may differ between DNS control panels, but we've covered the most common options here. If you're in any doubt, check with your DNS provider.
The type is the kind of DNS record that you want to create. Here, you need to choose CNAME.:
`;

export const Preview = () => {
  const { generating, result } = useGenerateStore();

  return (
    <div className="w-11/12 lg:w-5/12 flex justify-center mx-auto o">
      <Post
        title={'Title'}
        content={content}
        image={''}
        containerStyles={{}}
        contentStyles={{}}
        imageStyles={{}}
        titleStyles={{}}
      />
    </div>
  );
};
