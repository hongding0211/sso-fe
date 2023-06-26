import { Upload, Message } from '@arco-design/web-react';

const App = (props) => {
  return (
    <div>
      <Upload
        imagePreview
        limit={1}
        action='/'
        autoUpload={false}
        listType='picture-card'
        onPreview={(file) => {
          Message.info('click preview icon')
        }}
        {...props}
      />
    </div>
  );
};

export default App;
