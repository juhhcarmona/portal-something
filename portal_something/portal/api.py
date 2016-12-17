from restkiss.dj import DjangoResource
from restkiss.preparers import FieldsPreparer

from .models import Post
from .models import User

class PostResource(DjangoResource):
    preparer = FieldsPreparer(fields={
        'pk':'pk',
        'author': 'author.username',
        'title': 'title',
        'text': 'text',
        'published_date': 'published_date',
        'created_date': 'created_date'
    })

    def is_authenticated(self):
        return True
        #Alternatively, if the user is logged into the site...
        #return self.request.user.is_authenticated()

    def create(self):
        return Post.objects.create(
            author=self.data['author'],
            title=self.data['title'],
            text=self.data['text']
        )

    def list(self):
        return Post.objects.all()

    def detail(self, pk):
        return Post.objects.get(id=pk)

    def delete(self, pk):
        Post.objects.get(id=pk).delete()

    def update(self, pk):
        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            post = Post()

        post.title = self.data['title']
        post.author = User.objects.get(username=self.data['author'])
        post.text = self.data['text']
        post.save()
        return post