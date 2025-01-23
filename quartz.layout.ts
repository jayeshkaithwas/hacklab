import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const tagsToRemove = ["graph-exclude"]
const graphConfig = {
  localGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"]
  },
  globalGraph: {
    removeTags: tagsToRemove,
    excludeTags: ["graph-exclude"]
  }
};
// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.LinksHeader()],
  afterBody: [Component.Comments({
    provider: 'giscus',
    options: {
      // from data-repo
      repo: 'morrowind-modding/morrowind-modding.github.io',
      // from data-repo-id
      repoId: 'R_kgDOLP1-Jw',
      // from data-category
      category: 'Announcements',
      // from data-category-id
      categoryId: 'DIC_kwDOLP1-J84CdRF8',
      reactionsEnabled: true,
    }
  }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jayeshkaithwas/",
      LinkedIn: "https://www.linkedin.com/in/jayeshkaithwas/",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.MobileOnly(Component.TableOfContents2()),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      folderClickBehavior: "link", 
      filterFn: (node) => node.name !== "templates",
    })),
  ],
  right: [
    Component.MobileOnly(Component.Explorer({
      folderClickBehavior: "link", 
      filterFn: (node) => node.name !== "templates",
    })),
    Component.DesktopOnly(Component.Graph(graphConfig)),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.RecentNotes({
      title: "Recently Added",
      limit: 5,
      sort: (f1, f2) =>
        (f1.dates?.created.getTime() ?? Number.MAX_SAFE_INTEGER) -
        (f2.dates?.created.getTime() ?? Number.MAX_SAFE_INTEGER),
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta(), Component.MobileOnly(Component.TableOfContents2())],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      folderClickBehavior: "link", 
      filterFn: (node) => node.name !== "templates",
    })),
  ],
  right: [
    Component.MobileOnly(Component.Explorer({
      folderClickBehavior: "link", 
      filterFn: (node) => node.name !== "templates",
    })),
    Component.DesktopOnly(Component.Graph(graphConfig)),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}
