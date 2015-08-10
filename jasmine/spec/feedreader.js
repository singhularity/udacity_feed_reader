'use strict';
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        function testFeedUrl(feed) {

            it('Has url and is not empty!', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null);
                expect(feed.url.trim()).not.toBe("");
            });
        }

        allFeeds.forEach(function(feed) {
            testFeedUrl(feed);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        function testFeedName(feed) {

            it('Has name and is not empty!', function() {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
                expect(feed.name.trim()).not.toBe("");
            });
        }

        allFeeds.forEach(function(feed) {
            testFeedName(feed);
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu ', function() {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it("is hidden by default.", function() {
            expect($('body').attr('class')).toBe('menu-hidden');
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it(" is displayed and hidden when clicked.", function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });
    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries ', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it(" has atleast one entry", function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection ', function() {
        var firstFeed;
        beforeEach(function(done) {
            /* Refactored the before each function to load the first feed and capture the first elements HTML,
             did this because it seemed like the DOM wasn't rendered when I was trying to capture the first element.
             Now, the trick is to load feed 0, capture it's first element and add a callback to loadFeed(1) before...
             ..... we run the actual test. This way we are sure that we loaded two different feeds to compare. */
            loadFeed(0, function() {
                firstFeed = $('.feed .entry').first().html();
                loadFeed(1, function() {
                    done();
                });
            });
        });


        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it("changes content of the feeds section.", function(done) {
            expect($('.feed .entry').first().html()).not.toBe(firstFeed);
            done();
        });
    });

    /**
     * Add additional tests to make sure the feeds have a link and header
     */

    describe('Feeds section ', function() {
        var feedNum = 0;
        beforeEach(function(done) {
            loadFeed(feedNum, function() {
                done();
            });
        });


        /**
         * Test to make sure each feed entry has an article, non empty href and Header
         */
        function testStructure() {
            it(" has valid link and header", function(done) {
                // Gather all the feed entries and make sure the required entities are present
                var feedLinks = $('.feed .entry-link');
                feedLinks.each(function(feedLink) {
                    expect($(feedLinks[feedLink]).attr('href')).toBeDefined();
                    expect($(feedLinks[feedLink]).attr('href')).not.toBe("");
                    expect($(feedLinks[feedLink]).find('article')).toBeDefined();
                    expect($(feedLinks[feedLink]).find('article h2')).toBeDefined();
                    expect($(feedLinks[feedLink]).find('article h2').text()).not.toBe("");
                });
                feedNum += 1;
                done();
            });
        }

        //Iterate through each feed source and load them
        allFeeds.forEach(function() {
            testStructure();
        });
    });

    /**
     * FUTURE FEATURE :: Add additional tests to make sure the feeds have a share button
     */

    describe('Each feed ', function() {
        var feedNum = 0;
        beforeEach(function(done) {
            loadFeed(feedNum, function() {
                done();
            });
        });

        /**
         * Test to make sure each feed entry has a share button
         */
        function testShareLink() {
            it(" has a share link", function(done) {
                // Gather all the feed entries and make sure each one has a share button
                var feedLinks = $('.feed .entry-link');
                feedLinks.each(function(feedLink) {
                    expect($(feedLinks[feedLink]).find('article button').length).toBeGreaterThan(0);
                });
                feedNum += 1;
                done();
            });
        }

        //Iterate through each feed source and load them
        allFeeds.forEach(function() {
            testShareLink();
        });
    });

    /**
     * FUTURE FEATURE :: Add additional tests to make sure the feeds have an image
     */

    describe('Each feed image', function() {
        var feedNum = 0;
        beforeEach(function(done) {
            loadFeed(feedNum, function() {
                done();
            });
        });


        /**
         * FUTURE FEATURE :: Test to make sure each feed entry has an image associated with the feed
         * (Uses placeholder if not available)
         */
        function testFeedImage() {
            it(" is present", function(done) {
                // Gather all the feed entries and make sure each one has an Image
                var feedLinks = $('.feed .entry-link');
                feedLinks.each(function(feedLink) {
                    expect($(feedLinks[feedLink]).find('img').length).toBeGreaterThan(0);
                });
                feedNum += 1;
                done();
            });
        }

        //Iterate through each feed source and load them
        allFeeds.forEach(function() {
            testFeedImage();
        });
    });
}());